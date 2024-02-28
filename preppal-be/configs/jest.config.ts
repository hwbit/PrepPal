
import type {Config} from "@jest/types";

// Sync object
const jestconfig: Config.InitialOptions = {
    verbose: true,
    transform: {"^.+\\.ts?$": "ts-jest"},
};
export default jestconfig;
