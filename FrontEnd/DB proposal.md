# Personal Finance System

# Team members:



1. Shefalee Shet
2. Kai Wu
3. Ruifeng Zhang
4. Harsh Vadchhak 


# Users Collection 

The user collection will store all the necessary information about users.


```
{
   "_id": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
   "firstName": "John",
   "lastName": "Doe",
   "Email": "example@gmail.com",
   "hashPassword":"$2a$08$XdvNkfdNIL8F8xsuIUeSbNOFgK0M0iV5HOskfVn7.",
   "walletId": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
   "transactionId": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
   "budgetId": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",

}
```



## User


<table>
  <tr>
   <td>Name
   </td>
   <td>Type
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td><strong><code>_id</code></strong>
   </td>
   <td>ObjectId
   </td>
   <td>A globally unique identifier to represent the user
   </td>
  </tr>
  <tr>
   <td><strong><code>firstName</code></strong>
   </td>
   <td>string
   </td>
   <td>First Name of the user
   </td>
  </tr>
  <tr>
   <td><strong><code>lastName</code></strong>
   </td>
   <td>string
   </td>
   <td>Last Name of the user
   </td>
  </tr>
  <tr>
   <td><strong><code>Email</code></strong>
   </td>
   <td>string
   </td>
   <td>Email address of the user
   </td>
  </tr>
  <tr>
   <td><strong><code>hashPassword</code></strong>
   </td>
   <td>string
   </td>
   <td>The password the user uses to log in
   </td>
  </tr>
  <tr>
   <td><strong><code>walletId</code></strong>
   </td>
   <td>ObjectId
   </td>
   <td>A globally unique identifier referring the wallet object
   </td>
  </tr>
  <tr>
   <td><strong><code>transactionId</code></strong>
   </td>
   <td>ObjectId
   </td>
   <td>A globally unique identifier referring the transaction object
   </td>
  </tr>
  <tr>
   <td><strong><code>budgetId</code></strong>
   </td>
   <td>ObjectId
   </td>
   <td>A globally unique identifier referring the budget object
   </td>
  </tr>
</table>



# Wallet Collection

The wallet collection will store all the necessary information about digital wallet.


```
{
"_id": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    "Name": "walletname",
    "Amount": 0,
    "validAmount": 0,
    "Type": "debit"
}
```



## Wallet


<table>
  <tr>
   <td>Name
   </td>
   <td>Type
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td><strong><code>_id</code></strong>
   </td>
   <td>Object_id
   </td>
   <td>A globally unique identifier to represent the wallet
   </td>
  </tr>
  <tr>
   <td><strong><code>Name</code></strong>
   </td>
   <td>string
   </td>
   <td>Wallet name
   </td>
  </tr>
  <tr>
   <td><strong><code>Amount</code></strong>
   </td>
   <td>number
   </td>
   <td>Contains total amount in the wallet 
   </td>
  </tr>
  <tr>
   <td><strong><code>validAmount</code></strong>
   </td>
   <td>number
   </td>
   <td>Contains the balance amount after every transaction
   </td>
  </tr>
  <tr>
   <td><strong><code>Type</code></strong>
   </td>
   <td>string
   </td>
   <td>Contains from which card the payment was made
   </td>
  </tr>
</table>



# Schedule Payment Collection

The schedule payment collection will store all the necessary information about user payments.


```
{
"_id": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
"paymentDate": "10/24/2021",
"paymentType": "Income",
"walletId": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
"categoryId": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
"Amount": 50,
"currencyId": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
"Memo": "for asdasdas",
"lastPostDate": "10/24/2021"
}
```



## Schedule Payments


<table>
  <tr>
   <td>Name
   </td>
   <td>Type
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td><strong><code>_id</code></strong>
   </td>
   <td>Object_id
   </td>
   <td>A globally unique identifier to represent the payment details
   </td>
  </tr>
  <tr>
   <td><strong><code>paymentDate</code></strong>
   </td>
   <td>string
   </td>
   <td>When the payment was made
   </td>
  </tr>
  <tr>
   <td><strong><code>paymentType</code></strong>
   </td>
   <td>string
   </td>
   <td>Contains whether it was income or expense
   </td>
  </tr>
  <tr>
   <td><strong><code>categoryId</code></strong>
   </td>
   <td>Object_id
   </td>
   <td>Contains the category Id
   </td>
  </tr>
  <tr>
   <td><strong><code>walletId</code></strong>
   </td>
   <td>Object_id
   </td>
   <td>Contains the wallet Id
   </td>
  </tr>
  <tr>
   <td><strong><code>Amount</code></strong>
   </td>
   <td>number
   </td>
   <td>Contains how much the user spent or recieved money
   </td>
  </tr>
  <tr>
   <td><strong><code>currencyId</code></strong>
   </td>
   <td>Object_id
   </td>
   <td>Contains currency Id
   </td>
  </tr>
  <tr>
   <td><strong><code>Memo</code></strong>
   </td>
   <td>string
   </td>
   <td>Contains the comments the user wants to write
   </td>
  </tr>
  <tr>
   <td><strong><code>lastPostDate</code></strong>
   </td>
   <td>string
   </td>
   <td>Using this the user will notified the next month about due payments
   </td>
  </tr>
</table>



# Budget Collection

The budget collection will store all the necessary information about user budget.


```
{
	"_id": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
"Name": "budgetname",
"Amount": 1000,
"categoryId": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
"budgetType": "Yearly"
}
```



## Budget


<table>
  <tr>
   <td>Name
   </td>
   <td>Type
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td><strong><code>_id</code></strong>
   </td>
   <td>Object_id
   </td>
   <td>A globally unique identifier to represent the payment details
   </td>
  </tr>
  <tr>
   <td><strong><code>Name</code></strong>
   </td>
   <td>string
   </td>
   <td>Budget name
   </td>
  </tr>
  <tr>
   <td><strong><code>Amount</code></strong>
   </td>
   <td>number
   </td>
   <td>Amount the user wants to save or spend
   </td>
  </tr>
  <tr>
   <td><strong><code>categoryId</code></strong>
   </td>
   <td>Object_id
   </td>
   <td>Contains category Id
   </td>
  </tr>
  <tr>
   <td><strong><code>budgetType</code></strong>
   </td>
   <td>string
   </td>
   <td>Is it monthly or yearly
   </td>
  </tr>
</table>



# Transaction Collection

The transaction collection will store all the necessary information about user’s daily transactions.


```
{
	"_id": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
"paymentDate": "10/24/2021",
"paymentType": "Income",
"categoryId": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
"walletId": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
"Amount": 14,
"currencyId": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
"Memo": "wasdasdasdassd"
}
```



## Transactions


<table>
  <tr>
   <td>Name
   </td>
   <td>Type
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td><strong><code>_id</code></strong>
   </td>
   <td>Object_id
   </td>
   <td>A globally unique identifier to represent the payment details
   </td>
  </tr>
  <tr>
   <td><strong><code>paymentDate</code></strong>
   </td>
   <td>string
   </td>
   <td>When the payment was made
   </td>
  </tr>
  <tr>
   <td><strong><code>paymentType</code></strong>
   </td>
   <td>string
   </td>
   <td>Was it an income or expense
   </td>
  </tr>
  <tr>
   <td><strong><code>categoryId</code></strong>
   </td>
   <td>Object_id
   </td>
   <td>Contains category Id
   </td>
  </tr>
  <tr>
   <td><strong><code>walletId</code></strong>
   </td>
   <td>Object_id
   </td>
   <td>Contains wallet Id
   </td>
  </tr>
  <tr>
   <td><strong><code>Amount</code></strong>
   </td>
   <td>number
   </td>
   <td>Transaction amount
   </td>
  </tr>
  <tr>
   <td><strong><code>currencyId</code></strong>
   </td>
   <td>Object_id
   </td>
   <td>Contains currency Id
   </td>
  </tr>
  <tr>
   <td><strong><code>Memo</code></strong>
   </td>
   <td>string
   </td>
   <td>Comments the user wants to add
   </td>
  </tr>
</table>



# Category Collection

The category collection will store all the necessary information about different types of user payments.


```
{
"_id": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
"Name": "categoryName",
"paymentType": "Income",
"categoryColor": "white",
"Icon": "iconname"
}
```



## Category


<table>
  <tr>
   <td>Name
   </td>
   <td>Type
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td><strong><code>_id</code></strong>
   </td>
   <td>Object_id
   </td>
   <td>A globally unique identifier to represent the category details
   </td>
  </tr>
  <tr>
   <td><strong><code>Name</code></strong>
   </td>
   <td>string
   </td>
   <td>Name of the category
   </td>
  </tr>
  <tr>
   <td><strong><code>paymentType</code></strong>
   </td>
   <td>string
   </td>
   <td>Was it an income or expense
   </td>
  </tr>
  <tr>
   <td><strong><code>categoryColor</code></strong>
   </td>
   <td>string
   </td>
   <td>Different Colours for different type of categories
   </td>
  </tr>
  <tr>
   <td><strong><code>Icon</code></strong>
   </td>
   <td>string
   </td>
   <td>Image representation of category
   </td>
  </tr>
</table>



# Currency Collection

The currency collection will store information for different types of currency.


```
{
     "Name": "currency name",
     "shortName": "sn",
     "Symbol": "$",
     "Conversion": 0.0
}
```



## Currency


<table>
  <tr>
   <td>Name
   </td>
   <td>Type
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td><strong><code>Name</code></strong>
   </td>
   <td>string
   </td>
   <td>The name of the currency
   </td>
  </tr>
  <tr>
   <td><strong><code>shortName</code></strong>
   </td>
   <td>string
   </td>
   <td>The short name of the currency
   </td>
  </tr>
  <tr>
   <td><strong><code>symbol</code></strong>
   </td>
   <td>string
   </td>
   <td>The string symbol of the currency
   </td>
  </tr>
  <tr>
   <td><strong><code>conversion</code></strong>
   </td>
   <td>number
   </td>
   <td>Conversion number
   </td>
  </tr>
</table>