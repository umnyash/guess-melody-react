import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getStep = (state: State): number => state[NameSpace.Game].step;
export const getMistakesCount = (state: State): number => state[NameSpace.Game].mistakes;
