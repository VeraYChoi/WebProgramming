var http = require('http');
var fs = require('fs');
var qs = require('querystring');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Vera_Choi:Concertono.2@clusterwp.x26fxlv.mongodb.net/?retryWrites=true&w=majority";
	
http.createServer(function (req, res) 
  {
	console.log(3);
	
	
	  if (req.url == "/")
	  {
		  file = 'formpage.html';
		  fs.readFile(file, function(err, txt) {
    	  res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(txt);
          res.end();
		  });
	  }
	  else if (req.url == "/process")
	  {
		 res.writeHead(200, {'Content-Type':'text/html'});
		 pdata = "";
		 req.on('data', data => {
           pdata += data.toString();
         });
		 

		// when complete GET data is received
		req.on('end', () => {
			pdata = qs.parse(pdata);
			res.write("Here are the companies that match your search results: <br>");

			const client = new MongoClient(uri, {
				serverApi: {
				  version: ServerApiVersion.v1,
				  strict: true,
				  deprecationErrors: true,
				}
			  });
			  async function run() {
				console.log("run");
			   try {
				   
						// Connect the client to the server	(optional starting in v4.7)
					await client.connect();
						// Send a ping to confirm a successful connection
					await client.db("admin").command({ ping: 1 });
					console.log("Pinged your deployment. You successfully connected to MongoDB!");
					if (pdata['select'] == "Company Name") {
						var array = await client.db("company_info").collection("companies").find({name: pdata['search']}).toArray();
					}
					else {
						var array = await client.db("company_info").collection("companies").find({ticker: pdata['search']}).toArray();
					}
					
		
					for (let i = 0; i < array.length; i++) {
						res.write("<br>");
						res.write("<br>Company Name: " + array[i]['name']);
						res.write("<br>Stock Ticker: "+ array[i]['ticker']);
						res.write("<br>Stock Price: "+ array[i]['price']);
					}
					
				   
				 
				}
				finally {
				  // Ensures that the client will close when you finish/error
				  await client.close();
					res.end();
				  
				}
			  }
			  run().catch(console.dir);
			  
		});
		
	  }
	  else 
	  {
		  res.writeHead(200, {'Content-Type':'text/html'});
		  res.write ("Unknown page request");
		  res.end();
	  }
  
	
}).listen(process.env.PORT || 8080);