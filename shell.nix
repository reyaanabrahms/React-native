with (import <nixpkgs> {});
mkShell {
  buildInputs = [
    nodejs
    nodePackages.expo-cli
  ];
  shellHook = ''
      export NODE_OPTIONS='--openssl-legacy-provider'
  '';
}