# AdonisJS API Skeleton

> Awesome AdonisJS boilerplate to create APIs using a DDD based architecture

If you never worked with `AdonisJS` before, please give a look in its **[docs](http://adonisjs.com/docs/3.2/overview)** first

## How this architecture works

The major changes were made in the `app` folder, so the files in `bootstrap`, `config` and `database` works the same way as described in the `AdonisJS` docs, there were only few changes in these folders, so you don't need to worry too much about them.

This boilerplate uses a DDD based architecture, so the main folders you will be working with will be: `Domains` and `Modules` folders. Below I will talk a little about the folders inside `app`:

- `Core:` These are helper files that I created to make things simpler when working with this boilerplate, most likely that you don't need to change nothing here.

- `Domains:` Here you will create the domains of your application, each domain will have one or more: `models`, `repositories`, `resources (like messages)`, `validators`. Here you will put only domains that can be used and shared by your `Modules`.

- `Modules:` Here you will create the modules of your application, think in each module as an `micro service`, they're independent and can use one or many `Domains`. Each module needs to define their own `routes` and will have one or more: `controllers`, `resources (like messages)`, `services`.

- `Providers:` Here you will find three files...
  - `channels.js:` File used to define `Websocket channels` that your application can use
  - `events.js:` File used to define `Events` that your application will run
  - `routes.js:` File used to define the `Routes` of your application, you only need to create an array with the modules you want to be loaded in your application.

- `Support:` Here you can put helper files that can be used by any of your `Modules` and `Domains`.

## How to use

- Clone this **repo** and enter it

- Install the **dependencies**

```
yarn
```

- Copy the `.env.example` file to `.env` file

```
cp .env.example .env
```

- Generate the application key

```
./ace key:generate
```

- Run the **migrations**

```
./ace migration:run
```

- Run the **seeds**

```
./ace db:seed
```

## Commands available

- To run the lint use

```
yarn lint
```

- To run the app in development mode use

```
yarn serve:dev
```

- To run the app in production mode use

```
yarn serve
```
