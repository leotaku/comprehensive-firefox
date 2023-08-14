{
  description = "Nix flake for a pre-configured firefox";

  outputs = { nixpkgs, ... }:
    let
      forAllSystems = f:
        nixpkgs.lib.genAttrs nixpkgs.lib.systems.flakeExposed
        (system: f (nixpkgs.legacyPackages."${system}"));
      readJSON = filename: builtins.fromJSON (builtins.readFile filename);
      configureFirefox = firefox:
        firefox.override (old: {
          extraPolicies = {
            "DisableAppUpdate" = true;
          } // (readJSON ./policies/policies.json).policies;
          extraPrefsFiles = "${./firefox/config.js}";
        });
    in {
      packages = forAllSystems (prev: {
        firefox = configureFirefox prev.firefox;
        firefox-beta = configureFirefox prev.firefox-beta;
        firefox-devedition = configureFirefox prev.firefox-devedition;
      });
    };
}
