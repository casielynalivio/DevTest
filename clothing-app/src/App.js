import shirt from './images/tee.png';
import './App.css';
import {AppBar, Box, Button, Grid, ThemeProvider, Typography} from '@material-ui/core';
// import {createTheme} from '@material-ui/core/styles';



function App() {

  return (
    <ThemeProvider>
    <div className="App">
        <AppBar position='static' color='default'>
          <Typography align='right'>My Cart (4)</Typography>
        </AppBar>
        <Grid container className='Container'>
          <Grid md={6}>
            <Box className='BoxImage'>
             <img src={shirt} alt="logo" width={200} height={350}/>
            </Box>
          </Grid>
          <Grid md={6}>
            <Button variant='outlined' style={{border: '2px solid #000'}}>ADD TO CART</Button>
          </Grid>
        </Grid>
    </div>
    </ThemeProvider>
  );
}

export default App;
