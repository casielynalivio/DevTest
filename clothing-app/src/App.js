import './App.css';
import {AppBar, Box, Button, Grid, Link, Popover, Typography} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import useMobileDetect from 'use-mobile-detect-hook';

export default function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [sizeOptions, setSizeOptions] = useState([]);
  const detectMobile = useMobileDetect();

  useEffect(() => {
    fetch("https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product")
    .then(res => res.json())
    .then(
      (result) => {
        console.log('+++ result', result);
        setTitle(result.title);
        setDescription(result.description);
        setPrice(result.price);
        setImageURL(result.imageURL);
        setSizeOptions(result.sizeOptions);
      }
    )
  }, []);

    return (
      <div className="App">
          <AppBar position='static' style={{background: '#F6F6F7' , color: '#888888', boxShadow: 'none', padding: '10px'}}>
            <PopupState variant="popover" popupId="demo-popup-popover">
              {(popupState) => (
                <div>
                  <Link {...bindTrigger(popupState)}>
                    <Typography align='right' variant='body2' style={{marginRight: '50px'}}>My Cart (4)</Typography>
                  </Link>
                  {!detectMobile.isMobile() &&
                    <Popover
                      {...bindPopover(popupState)}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      style={{
                        marginLeft: '-47px',
                        boxShadow: 'none'
                      }}
                    >
                      
                      <Grid container>
                        <Grid item xs={3} className='CartImage'>
                        <img src={imageURL} alt="logo" width={60} height={100}/>
                        </Grid>
                        <Grid item xs={9} className='CartText'>
                          <Typography sx={{ p: 2 }} variant='body2'>Classic Tee</Typography>
                          <Typography variant='body2'>1 x ${price}.00</Typography>
                          <Typography variant='body2'>Size: S</Typography>
                        </Grid>
                      </Grid>
                    </Popover>
                  }

                  {detectMobile.isMobile() &&
                    <Popover
                      {...bindPopover(popupState)}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      style={{
                        marginLeft: '-47px',
                        boxShadow: 'none'
                      }}
                      PaperProps={{
                        style: { width: '70%' },
                      }}
                    >
                      
                      <Grid container>
                        <Grid item xs={3} className='CartImage'>
                        <img src={imageURL} alt="logo" width={60} height={100}/>
                        </Grid>
                        <Grid item xs={9} className='CartText'>
                          <Typography sx={{ p: 2 }} variant='body2'>Classic Tee</Typography>
                          <Typography variant='body2'>1 x ${price}.00</Typography>
                          <Typography variant='body2'>Size: S</Typography>
                        </Grid>
                      </Grid>
                    </Popover>
                  }
                  
                </div>
              )}
            </PopupState> 
          </AppBar>
          <Grid container className='Container'>
            <Grid item md={6}>
              
                {!detectMobile.isMobile() &&
                <Box className='BoxImage'>
                    <img src={imageURL} alt="logo" width={400} height={550}/>
                </Box>
                }
               {detectMobile.isMobile() &&
                <Box style={{margin: '30px'}}>
                   <img src={imageURL} alt="logo" width={350} height={500}/>
                </Box>
                }
            </Grid>
            <Grid item md={6} className="ContentDetails">
              <Typography style={{marginBottom: '15px', fontWeight: 'bold'}}>{title}</Typography>
              <Typography style={{marginBottom: '15px', fontWeight: 'bold'}}>${price}.00</Typography>
              <Typography style={{marginBottom: '15px', color: '#888888'}}>{description}</Typography>
              <Typography style={{marginBottom: '15px', color: '#888888'}}>SIZE*</Typography>
              {sizeOptions.map((size) => {
                return <Button variant='oulined' style={{border: '2px solid #CCCCCC', margin: '5px'}} className="ButtonSizes">{size.label}</Button>
              })}
              <Button variant='outlined' style={{border: '2px solid #222222'}} sx={{':hover': {color: '#fff !important'}}} className="AddToCartButton">ADD TO CART</Button>
            </Grid>
          </Grid>
      </div>
    ); 
}
