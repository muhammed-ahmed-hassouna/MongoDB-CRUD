// ? Find documents, limit to 2, skip the first one, and sort by name in ascending order
// ? Use of `find()` with `limit()`, `skip()`, and `sort()`
// ! db.collection.find().limit(2).skip(1).sort({name: 1})

// ? Find documents with the name "Ahmed," select only the 'name' and 'age' fields, excluding '_id'
// ? Use of `find()` with query and projection
// ! db.collection.find({name: "Ahmed"}, {name: 1, age: 1, _id: 0})

// ? Find documents where the name is exactly 'Ahmed'
// ? Use of `$eq` for equality
// ! db.collection.find({name: { $eq: 'Ahmed' }})

// ? Find documents where the name is not 'Ahmed'
// ? Use of `$ne` for inequality
// ! db.collection.find({name: { $ne: 'Ahmed' }})

// ? Find documents where age is greater than 13
// ? Use of `$gt` for greater than
// ! db.collection.find({age: { $gt: 13 }})

// ? Find documents where the name is 'Ahmed' or 'Mohammed'
// ? Use of `$in` for matching any value in a specified array
// ! db.collection.find({name: { $in: ['Ahmed', 'Mohammed'] }})

// ? Find documents where the 'age' property exists
// ? Use of `$exists` to check if a field exists
// ! db.collection.find({age: {$exists: true}})

// ? Find documents where the 'age' property does not exist
// ? Use of `$exists` with `false` to check if a field does not exist
// ! db.collection.find({age: {$exists: false}})

// ? Example findOne operation
// ! db.collection.findOne({name: 'Ahmed'})

// ? Example findByIdAndUpdate operation
// ! db.collection.findByIdAndUpdate(id, { $set: { name: 'NewName' }}, { new: true })

// ? Example findOneAndUpdate operation
// ! db.collection.findOneAndUpdate({name: 'Ahmed'}, { $set: { age: 25 }}, { new: true })

// ? Example findByIdAndDelete operation
// ! db.collection.findByIdAndDelete(id)
