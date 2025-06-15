
-- 1. Create a public.profiles table to store rich user info
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Sync new users to profiles table
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, phone, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'phone', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', '')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Make RLS policies (only user can select/update/delete their own profile)
alter table public.profiles enable row level security;

create policy "Profiles are viewable by the user" 
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- 4. Create a wishlists table to store product ids for each user
create table if not exists public.wishlists (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete cascade,
  product_id text not null,
  created_at timestamptz default now()
);

-- 5. RLS: Wishlists only accessible by their owners
alter table public.wishlists enable row level security;

create policy "Users can select their own wishlists"
  on public.wishlists
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own wishlists"
  on public.wishlists
  for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own wishlists"
  on public.wishlists
  for delete
  using (auth.uid() = user_id);
