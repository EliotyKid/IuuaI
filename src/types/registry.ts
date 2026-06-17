export interface ComponentManifest {
  name: string;

  files: string[];

  dependencies?: string[];

  registryDependencies?: string[];
}