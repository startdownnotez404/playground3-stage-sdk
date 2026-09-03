import type { OrchestraGraphNodeTaskContract } from "../../orchestraGraphConfig";
import { type Playground3SkillReader } from "../skills";
export declare const buildPlayground3NodeTaskContractMessage: (input: {
    task?: OrchestraGraphNodeTaskContract;
    skillReader?: Playground3SkillReader;
}) => Promise<string | null>;
