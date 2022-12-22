import {
  groth,
  genProof,
  verifyProof,
  stringifyBigInts,
  unstringifyBigInts,
} from "snarkjs";
import { compile } from "circom";

export class ZKAuth {
  static serialize(data: any): string {
    return JSON.stringify(stringifyBigInts(data));
  }

  static deserialize(serializedData: string): any {
    return unstringifyBigInts(JSON.parse(serializedData));
  }

  static async generateWitness(circuit: any, input: any): Promise<any> {
    return circuit.calculateWitness(input);
  }

  static async generateCircuit(circomFilePath: string): Promise<any> {
    const circuitDef = await compile(circomFilePath);
    // return new snarkjs.Circuit(circuitDef);
  }

  static generateProof(circuit: any, witness: any, provingKey: any): any {
    return genProof(circuit, witness, provingKey);
  }

  static generateKeyPair(circuit: any): {
    provingKey: any;
    verificationKey: any;
  } {
    return groth.genKeyPair(circuit);
  }

  static verifyGeneratedProof(
    verificationKey: any,
    proof: any,
    publicSignals: any
  ): boolean {
    return verifyProof(verificationKey, proof, publicSignals);
  }

  static verifyProofWithProvingKey(
    provingKey: any,
    proof: any,
    publicSignals: any
  ): boolean {
    // const verificationKey = groth.genVerificationKey(provingKey);
    // return verifyProof(verificationKey, proof, publicSignals);
    return false;
  }

  static async generateProofAndKeyPair(
    circomFilePath: string,
    input: any
  ): Promise<{ provingKey: any; verificationKey: any; proof: any }> {
    const circuit = await this.generateCircuit(circomFilePath);
    const witness = await this.generateWitness(circuit, input);
    const keyPair = this.generateKeyPair(circuit);
    const proof = this.generateProof(circuit, witness, keyPair.provingKey);
    return {
      provingKey: keyPair.provingKey,
      verificationKey: keyPair.verificationKey,
      proof: proof,
    };
  }
}
