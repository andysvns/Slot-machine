import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: colors.blue.darken1, // #0772BA
            secondary: colors.orange.darken1, // #F5821F
            accent: colors.white, // #ffffff
          },
        },
      },
});
