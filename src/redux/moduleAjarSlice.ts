import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SubModule {
  __typename: string;
  title: string;
  content: string;
  _id: string;
}

interface LearningProgram {
  __typename: string;
  title: string;
  description: string;
}

interface ModuleAjar {
  __typename: string;
  _id: string;
  title: string;
  subModules: SubModule[];
  program: string | null;
  learningProgram: LearningProgram;
}

interface ModuleAjarState {
  modules: ModuleAjar[];
}

const initialState: ModuleAjarState = {
  modules: [],
};

const moduleAjarSlice = createSlice({
  name: 'moduleAjar',
  initialState,
  reducers: {
    setModules(state, action: PayloadAction<ModuleAjar[]>) {
      state.modules = action.payload;
    },
    clearModules(state) {
      state.modules = [];
    },
  },
});

export const { setModules, clearModules } = moduleAjarSlice.actions;
export default moduleAjarSlice.reducer;