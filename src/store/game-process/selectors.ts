import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getStep = (state: Pick<State, NameSpace.Game>): number => state[NameSpace.Game].step;
export const getMistakesCount = (state: Pick<State, NameSpace.Game>): number => state[NameSpace.Game].mistakes;
