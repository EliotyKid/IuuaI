export interface ComponentManifest {
  name: string;

  files: string[];

  components?: Record<string, string[]>;

  dependencies?: string[];

  registryDependencies?: string[];
}