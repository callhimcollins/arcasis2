import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import getStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { CartItemType, ProductType } from '@/types'
import { supabase } from '@/lib/supabase'
import { addCartProductToState, removeCartProductFromState, removeFromCart, returnCartSubTotal, setOrAddToCart, setOrderDetails } from '@/state/features/orderSlice'
import { setNotification } from '@/state/features/notificationSlice'

const SearchItem = ({ name, imageUrl, price, description, productId, availablityStatus }:ProductType) => {
  const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
  const order = useSelector((state:RootState) => state.order)
  const user = useSelector((state:RootState) => state.user)
  const dispatch =useDispatch()
  const styles = getStyles(appearanceMode)


  const handleOrder = async () => {
    if(!user.userId) return;
    try {
      if(order.orderDetails && order.orderDetails.orderId) {
        console.log('Order Id exists...')
        await handleAddCartItem()
      } else {
        console.log("Can't add to cart. Order ID not found!")
        const { data: orderData, error: orderError } = await supabase
        .from('Orders')
        .insert({ userId: user.userId, status: "created" })
        .select()
        .single()
  
        if(orderData) {
          console.log("Order Created!", orderData)
          const { error: cartItemError } = await supabase
          .from('CartItems')
          .insert({ productId, orderId: orderData.orderId, quantity: 1 })
          if(cartItemError) {
            console.log("An error occurred creating cart item", cartItemError)
          } else {
            await dispatch(setOrderDetails(orderData))
            await dispatch(setOrAddToCart({ productId: productId, orderId: orderData.orderId, quantity: 1 }))
            await dispatch(addCartProductToState({ productId, name, imageUrl, price, description, availablityStatus }))
            await dispatch(returnCartSubTotal())
            await dispatch(setNotification({ notificationType: 'system', messageType: 'success', message: 'Added To Gift Box', showNotification: true, stay: false }))
          }
        }
        if(orderError) {
          console.log("An error occurred creating order", orderError.message)
        }
      }
    } catch (error) {
      console.log("An error occurred in handleOrder", error)
    }
  }

  const handleRemoveCartItem = async (product: CartItemType) => {
    try {
      const { error } = await supabase
      .from('CartItems')
      .delete()
      .eq('productId', productId)
      .eq('userId', user.userId)
      if(error) {
        console.log("An error occurred removing cart item", error)
      } else {
        dispatch(removeFromCart(product))
        dispatch(removeCartProductFromState({ productId, name, imageUrl, price, description, availablityStatus }))
        dispatch(setNotification({ notificationType: 'system', messageType: 'success', message: 'Removed From Gift Box', showNotification: true, stay: false }))
      }
    } catch (error) {
      console.log('An error occurred in handleRemoveCartItem', error)
    }
  }

  const handleAddCartItem = async () => {
    try {
      if(order.orderDetails) {
        const { data, error } = await supabase
        .from('CartItems')
        .insert({ productId, orderId: order.orderDetails.orderId, quantity: 1 })
        .select()
        .single()

        if(data) {
          dispatch(setOrAddToCart(data))
          dispatch(addCartProductToState({ productId, name, imageUrl, price, description, availablityStatus }))
          dispatch(setNotification({ notificationType: 'system', messageType: 'success', message: 'Added To Gift Box', showNotification: true, stay: false }))
        }

        if(error) {
          console.log('An error occurred in handleAddCartItem', error)
        }
      }
    } catch (error) {
      console.log('An error occurred in handleAddCartItem', error)
    }
  }

  const handleCartItemButton = async () => {
    const productFound = order.cartItems.find(item => item.productId === productId)
    if(productFound) {
      handleRemoveCartItem(productFound)
      await dispatch(returnCartSubTotal())
    } else {
      await handleOrder()
      await dispatch(returnCartSubTotal())
    }
  }

  const returnCartItemButton = () => {
    const productFound = order.cartItems.find(item => item.productId === productId)
    if(productFound) {
      return (
        <TouchableOpacity onPress={handleCartItemButton}>
          <Text style={styles.removeFromCartButtonText}>Remove From Gift Box</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity onPress={handleCartItemButton} style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>Add To Gift Box</Text>
        </TouchableOpacity>
      )
    }
  }



  return (
    <View style={styles.container}>
      <Text style={styles.price}>${price}</Text>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description?.replace(/<li>/g, '')?.replace(/<\/li>/g, '\n')?.trim()}</Text>

      {returnCartItemButton()}
    </View>
  )
}

export default SearchItem
