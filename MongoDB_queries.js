//For the following question write the corresponding MongoDB queries


// 1. Find all the information about each products

db.collection.find().pretty()


// 2.Find the product price which are between 400 and 800

db.collection.find({product_price:{$gt:400,$lt:800}}).pretty()
db.collection.find({$and: [{product_price:{$gt:400}},{product_price:{$lt:800}}]}).pretty()


// 3. Find the product price which are not between 400 and 600

db.collection.find({product_price:{$not:{$gt:400,$lt:600}}}).pretty()
db.collection.find({$or: [{product_price:{$lte:400}},{product_price:{$gte:600}}]}).pretty()


// 4. List the four product which are greater than 500 in price 

db.collection.find({product_price:{$gt:500}}).limit(4).pretty()

// 5. Find the product name and product material of each products

db.collection.find({},{product_name:1,product_material:1}).pretty()


// 6. Find the product with a row id of 10

db.collection.find({id:/^10$/}).pretty()


// 7. Find only the product name and product material

db.collection.find({},{_id:0,product_name:1,product_material:1})


// 8. Find all products which contain the value of soft in product material 

db.collection.find({product_material:/soft/i}).pretty()


// 9. Find products which contain product color indigo  and product price 492.00

db.collection.find({$and:[{product_color:/indigo/},{product_price:492.00}]}).pretty()


// 10. Delete the products which product price value are same

  db.collection.aggregate([
    {
      $group: {
        _id: "$product_price",
        count: { $sum: 1 },
        ids: { $push: "$_id" }
      }
    },
    {
      $match: {
        count: { $gt: 1 }
      }
    },
    {
      $unwind: "$ids"
    },
    {
      $project: {
        _id: "$ids"
      }
    }
  ]).forEach(function(doc) {
    db.collection.deleteOne({_id: doc._id});
  });
  