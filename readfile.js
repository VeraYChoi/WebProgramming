console.log(2);

var http = require('http');
var fs = require('fs');
var readline = require('readline');
//var client = require('mongodb').MongoClient;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Vera_Choi:Concertono.2@clusterwp.x26fxlv.mongodb.net/?retryWrites=true&w=majority";


http.createServer(function (req, res) {
    
        console.log ("function");
        // Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      var myobj = { name: "Company Inc", ticker: "SAMP", price: "8.00" };
      await client.db("company_info").collection("companies").insertOne(myobj, function(err, res) {
              if (err) throw err;
              console.log("1 document inserted");
              client.close();
            });
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
    
    // client = MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    //     console.log("connected to database?")

    //     if (err) throw err;
    //     var dbo = db.db("company_info");
    //     var myobj = { name: "Company Inc", ticker: "SAMP", price: "8.00" };

    //     dbo.collection("companies").insertOne(myobj, function(err, res) {
    //       if (err) throw err;
    //       console.log("1 document inserted");
    //       db.close();
    //     });
    //   });
    // var stream = fs.createReadStream("./companies.csv");
    // var output = "hello";
    // var i = 0;
    // rl = readline.createInterface({ input: stream });
    // var data = [];
    // rl.on("line", (row) => {
    // data.push(row.split(","));
    // console.log(data[i]);
    // i++;
    // });
    


    res.write("done");
  res.end();
}).listen(process.env.PORT || 8080);
