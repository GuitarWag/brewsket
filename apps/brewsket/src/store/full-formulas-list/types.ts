/* eslint camelcase: 0 */

export interface Versions {
  stable: string;
  devel?: any;
  head: string;
  bottle: boolean;
}

export interface Stable {
  url: string;
  tag?: any;
  revision?: any;
}

export interface Urls {
  stable: Stable;
}

export interface Catalina {
  url: string;
  sha256: string;
}

export interface Mojave {
  url: string;
  sha256: string;
}

export interface HighSierra {
  url: string;
  sha256: string;
}

export interface Files {
  catalina: Catalina;
  mojave: Mojave;
  high_sierra: HighSierra;
}

export interface Stable2 {
  rebuild: number;
  cellar: string;
  prefix: string;
  root_url: string;
  files: Files;
}

export interface Bottle {
  stable: Stable2;
}

export interface RuntimeDependency {
  full_name: string;
  version: string;
}

export interface Installed {
  version: string;
  used_options: any[];
  built_as_bottle: boolean;
  poured_from_bottle: boolean;
  runtime_dependencies: RuntimeDependency[];
  installed_as_dependency: boolean;
  installed_on_request: boolean;
}

export interface Formulae {
  name: string;
  full_name: string;
  oldname?: any;
  aliases: any[];
  versioned_formulae: any[];
  desc: string;
  homepage: string;
  versions: Versions;
  urls: Urls;
  revision: number;
  version_scheme: number;
  bottle: Bottle;
  keg_only: boolean;
  bottle_disabled: boolean;
  options: any[];
  build_dependencies: string[];
  dependencies: string[];
  recommended_dependencies: any[];
  optional_dependencies: any[];
  uses_from_macos: any[];
  requirements: any[];
  conflicts_with: any[];
  caveats?: any;
  installed: Installed[];
  linked_keg: string;
  pinned: boolean;
  outdated: boolean;
}
