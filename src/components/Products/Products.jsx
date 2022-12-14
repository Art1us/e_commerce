import React from "react";
import { Grid } from "@material-ui/core";
import Product from "./Product/Product";

import useStyles from './styles'

function Products({products, onAddToCart}) {
  const classes = useStyles()
  return (
    <main className={classes.content}>
      <div className={classes.toolbar}/>
      <Grid container justifyContent="center" spacing={4}>
        {products.map((prod) => (
          <Grid item key={prod.id} xs={12} sm={6} md={4} lg={3}>
            <Product prod={prod} onAddToCart={onAddToCart}/>
          </Grid>
        ))}
      </Grid>
    </main>
  );
}

export default Products;
