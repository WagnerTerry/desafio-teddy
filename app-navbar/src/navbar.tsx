import * as React from 'react';
import * as singleSpa from 'single-spa'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);

    switch (newValue){
      case 0:
        singleSpa.navigateToUrl('/app-home');
        break;
      case 1:
        singleSpa.navigateToUrl('/app-home');

        break;
      case 2:
        singleSpa.navigateToUrl('/app-home');

        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Home" />
        <Tab label="Cadastrar Parceiro" />
        <Tab label="Listar todos os parceiros" />
        <Tab label="Cadastrar empresa externa" />
        <Tab label="Listar empresa externa" />
        <Tab label="Sobre" />   
        <Tab label="Sair" />
      </Tabs>
    </Box>
  );
}