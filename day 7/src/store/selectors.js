



export function selectProductById(state, productId) {
  const allProducts = state.products.items;
  
  for (let i = 0; i < allProducts.length; i++) {
    const product = allProducts[i];
    if (product.id === productId) {
      return product;
    }
  }
  
  return undefined;
}


export function selectCartItemsWithProducts(state) {
  const cartItems = state.cart.items;
  const itemsWithProducts = [];
  

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    

    const product = selectProductById(state, cartItem.id);
    
    if (product) {
      const itemWithProduct = {
        ...product, 
        quantity: cartItem.quantity 
      };
      itemsWithProducts.push(itemWithProduct);
    }
  }
  
  return itemsWithProducts;
}

export function selectWishlistItemsWithProducts(state) {
  const wishlistProductIds = state.wishlist.items;
  const wishlistProducts = [];
  for (let i = 0; i < wishlistProductIds.length; i++) {
    const productId = wishlistProductIds[i];
    

    const product = selectProductById(state, productId);
    
    if (product) {
      wishlistProducts.push(product);
    }
  }
  
  return wishlistProducts;
}


export function selectCartTotal(state) {
  const cartItems = state.cart.items;
  let totalPrice = 0;
  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    
    const product = selectProductById(state, cartItem.id);
    
    if (product) {
      const itemCost = product.price * cartItem.quantity;
      totalPrice = totalPrice + itemCost;
    }
  }
  
  return totalPrice;
}


export function selectCartTotalItems(state) {
  const cartItems = state.cart.items;
  let totalItems = 0;
  

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    totalItems = totalItems + cartItem.quantity;
  }
  
  return totalItems;
}

export function selectFilteredProducts(state) {
  const allProducts = state.products.items;
  const searchTerm = state.products.searchTerm;
  
  const filteredProducts = [];
  
 
  for (let i = 0; i < allProducts.length; i++) {
    const product = allProducts[i];
    
  
    let matchesSearch = true; 
    
    if (searchTerm && searchTerm.length > 0) {
      const searchLower = searchTerm.toLowerCase();
      const titleLower = product.title.toLowerCase();
      const descriptionLower = product.description.toLowerCase();
      
      const foundInTitle = titleLower.includes(searchLower);
      const foundInDescription = descriptionLower.includes(searchLower);
      
      matchesSearch = foundInTitle || foundInDescription;
    }
    
    if (matchesSearch) {
      filteredProducts.push(product);
    }
  }
  
  return filteredProducts;
}
