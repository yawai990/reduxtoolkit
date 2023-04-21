export const onApproveHandler = (data,actions) => {
     return actions.order.capture()
     .then(orderData => {

       var transaction = orderData.purchase_units[0].payments.captures[0];

       
       if(transaction.status ==="COMPLETED" && Number(transaction.amount.value) === Number(cartSubtotal)){
         updateOrder(id)
         .then(resp => {
           if(resp.isPaid){
             updateStateAfterOrder(resp.paidAt)
           }
         })
       }
     })
};

export const onCancelHandler = () => {
     console.log('paypal cancel')
};

export const onErrHandler = () => {
     console.log('paypal error')
};