module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        doctorname: String,
        department: String,
        specialisation: String,
        experience:Number,
        published:Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const hospital = mongoose.model("Hospital", schema);
    return hospital;
}