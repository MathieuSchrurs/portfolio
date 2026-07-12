import mixins from './mixins';

export interface Theme {
  mixins: typeof mixins;
}

const theme: Theme = {
  mixins,
};

export default theme;
