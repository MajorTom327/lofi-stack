# Welcome to the LofiStack!

- [Remix Docs](https://remix.run/docs)
- [Vercel](https://vercel.com)

This project include many dependencies and basic configuration for projects.
Like:

- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [ts-pattern](https://npmjs.org/package/ts-pattern)
- [Ramda](https://ramdajs.com/)
- [Ramda-Adjunct](https://char0n.github.io/ramda-adjunct/)
- [Remix-Utils](https://github.com/sergiodxa/remix-utils)

This include a basic configuration for vercel

## Deployment

After having run the `create-remix` command and selected "Vercel" as a deployment target, you only need to [import your Git repository](https://vercel.com/new) into Vercel, and it will be deployed.

## Development

To run your Remix app locally, make sure your project's local dependencies are installed:

```sh
yarn install
```

Afterwards, start the Remix development server like so:

```sh
yarn dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!

If you're used to using the `vercel dev` command provided by [Vercel CLI](https://vercel.com/cli) instead, you can also use that, but it's not needed.

## Tests

To run the test, simply use the following command:

```sh
yarn test
```
