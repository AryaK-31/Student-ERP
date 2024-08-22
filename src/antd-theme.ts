import './scss/_variable.scss';

const antdConfigProviderTheme = {
  components: {
    Menu: {
      itemBorderRadius: 0,
      itemMarginInline: 0,
      itemMarginBlock: 0,
      itemSelectedBg: 'var(--color-secondary)',
      itemHeight: 60,
      itemSelectedColor: 'white',
    },
    Table : {
      headerBg : '#ececec',
      headerBorderRadius : 0,
      cellPaddingBlock : 10
    }
  },
};


export default antdConfigProviderTheme