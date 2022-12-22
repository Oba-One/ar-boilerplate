/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly PUBLIC_URL: string;
  }
}

declare module "snarkjs" {
  export const groth = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    genKeyPair: (circuit: any) => any,
  };
  export function genProof(circuit: any, witness: any, provingKey: any): any;
  export function verifyProof(
    verificationKey: any,
    proof: any,
    publicSignals: any
  ): boolean;
  export function stringifyBigInts(proof: any): string;
  export function unstringifyBigInts(serializedProof: string): any;
}

declare module "circom" {
  export function compile(circomFilePath: string): any;
}

declare module "siwe" {
  export class SiweMessage {
    constructor(options: any);
    prepareMessage(): string;
  }
}

declare module "*.avif" {
  const src: string;
  export default src;
}

declare module "*.bmp" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
