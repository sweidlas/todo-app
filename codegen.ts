import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  //schema: 'http://localhost:8080/graphql', // Your GraphQL endpoint
  schema: 'schema.graphqls',
  documents: 'src/app/shared/graphql/**/*.ts', // Path to your .graphql files
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-apollo-angular'],
      config: {
        withHooks: false,
        apolloAngularVersion: 4,
        addExplicitOverride: true,
      },
    },
  },
};

export default config;
