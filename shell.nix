with (import <nixpkgs> {});
mkShell {
  buildInputs = [
    nodejs
  ];
  shellHook = ''
      export NODE_OPTIONS='--openssl-legacy-provider'
      npm install expo
  '';
}