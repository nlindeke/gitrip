/* @flow */
'use strict';

import React, {
  Text,
} from 'react-native';

var baseUrl = 'https://project-ripple1.herokuapp.com/v1/';

exports.loginUser = function(TOKEN) {
  return new Promise((resolve, reject) => {
      fetch(baseUrl + 'login' , {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: TOKEN,
      },)
    })
    .then((response) => response.text())
    .then((responseText) => {
        
        resolve(responseText);
    })
    .catch((error) => {
        reject(error);
    });
  });
};

exports.getFriendFeed = function(TOKEN) {
  return new Promise((resolve, reject) => {
      fetch(baseUrl + 'feed' , {
      method: 'GET',
      headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json',
	    'Token' : TOKEN,
      },
    })
    .then((response) => response.text())
    .then((responseText) => {
        resolve(responseText);
    })
    .catch((error) => {
        reject(error);
    });
  });
};

exports.getOngoingPosts = function(TOKEN) {
return new Promise((resolve, reject) => {
	fetch(baseUrl + 'feed/ongoing' , {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Token' : TOKEN,
		}
	})
	.then((response) => response.text())
    .then((responseText) => {
        resolve(responseText);
    })
    .catch((error) => {
        reject(error);
    });
  });
};

exports.acceptPost = function(TOKEN, postNbr, user) {
return new Promise((resolve, reject) => {	
	fetch(baseUrl + 'feed/' + postNbr + '/accept'  , {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    'Token' : TOKEN,
		},
		body: JSON.stringify(user)
	})
	.then((response) => response.text())
    .then((responseText) => {
        resolve(responseText);
    })
    .catch((error) => {
        reject(error);
    });
  });
};


exports.offerHelp = function(TOKEN, postNbr) {
return new Promise((resolve, reject) => {		 
	fetch(baseUrl + 'feed/' + postNbr + '/help' , {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    'Token' : TOKEN,
		  }
		})
	.then((response) => response.text())
    .then((responseText) => {
        resolve(responseText);
    })
    .catch((error) => {
        reject(error);
    });
  });
};

exports.resolvePost = function(TOKEN, postNbr) {
return new Promise((resolve, reject) => {
	fetch(baseUrl + 'feed/' + postNbr + '/resolve' , {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    'Token' : TOKEN,
		  }
		})
	.then((response) => response.text())
    .then((responseText) => {
        resolve(responseText);
    })
    .catch((error) => {
        reject(error);
    });
  });
};

exports.deletePost = function(TOKEN, postNbr) {
return new Promise((resolve, reject) => {	 
	   fetch(baseUrl + 'feed/' + postNbr + '/delete' , {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    'Token' : TOKEN,
		  }
		})
	.then((response) => response.text())
    .then((responseText) => {
        resolve(responseText);
    })
    .catch((error) => {
        reject(error);
    });
  });
};

exports.vouchePost = function(TOKEN, postNbr) {
return new Promise((resolve, reject) => {
	   fetch(baseUrl + 'feed/' + postNbr + '/vouche' , {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    'Token' : TOKEN,
		  }
		})
	.then((response) => response.text())
    .then((responseText) => {
        
    	console.log(resolve);
    	console.log(responseText);        
    })
    .catch((error) => {
        reject(error);
    });
  });
};

exports.getLeaderboardFriends = function(TOKEN) {
return new Promise((resolve, reject) => {
	   	fetch(baseUrl + 'feed/leaderboard' , {
		method: 'GET',
		headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'Token' : TOKEN,
      },
    })
    .then((response) => response.text())
    .then((responseText) => {
        resolve(responseText);
    })
    .catch((error) => {
        reject(error);
    });
  });
};

exports.getLocalFeed = function(TOKEN, lat, long) {
return new Promise((resolve, reject) => {
	   fetch(baseUrl + 'feed/local' , {
		  method: 'GET',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    'Token' : TOKEN,
	    	'lat': lat,
	    	'long': long,		    
		  },
		})
	.then((response) => response.text())
    .then((responseText) => {
        resolve(responseText);
    })
    .catch((error) => {
        reject(error);
    });
  });
};

exports.addPost = function(TOKEN, TITLE, DESCRIPTION, LAT, LONG) {
  return new Promise((resolve, reject) => {
   fetch(baseUrl + 'feed' , {
	  method: 'POST',
	  headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json',
	    'Token' : TOKEN,
	  },body: JSON.stringify(
	  {
	  	title: TITLE,
	  	description: DESCRIPTION,
	  	lat: LAT,
	  	long: LONG,
	  })
	  //Post klassen måste se ut som:  POST(titel, description, lat[Optional], long[Optional])
	})
    .then((response) => response.text())
    .then((responseText) => {
    	console.log(resolve);
    	console.log(responseText);
    })
    .catch((error) => {
        reject(error);
    });
  });
};







var serverCommunicator = {
	//Alla parametrar borde skickas in som strängar Förutom user och post.
	test: function() {
	    fetch(baseUrl , {
		  method: 'GET',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  }
		})
		.then((response) => response.text())
		.then((responseText) => {
			return responseText
		})
		.catch((error) => {
		  console.warn(error);
		}).done();
	},

	loginUser : function(TOKEN) {

	      fetch(baseUrl + 'login' , {
	      method: 'POST',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json',
	      },
	      body: JSON.stringify({
	      	accessToken: TOKEN,
	      },)
	    })
	    .then((response) => response.text())
	    .then((responseText) => {
	    	
	      return responseText
	    })
	    .catch((error) => {
	      console.warn(error);
	    });
	  },

	getOngoingPosts : function(TOKEN) {

	    fetch(this.baseUrl + 'feed/ongoing' , {
		  method: 'GET',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    'Token' : TOKEN,
		  }
		})
		.then((response) => response.text())
		.then((responseText) => {
		  console.log(responseText);
		})
		.catch((error) => {
		  console.warn(error);
		});
	},

	acceptPost : function(TOKEN, postNbr, user) {
	 
	   fetch(this.baseUrl + 'feed/' + postNbr + '/accept'  , {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    'Token' : TOKEN,
		  },
		  body: JSON.stringify(user)
		})
	   .then((response) => response.text())
		.then((responseText) => {
		  console.log(responseText);
		})
		.catch((error) => {
		  console.warn(error);
		});

	    
	},
	offerHelp : function(TOKEN, postNbr) {
	 
	   fetch(this.baseUrl + 'feed/' + postNbr + '/help' , {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    'Token' : TOKEN,
		  }
		})
		.then((response) => response.text())
		.then((responseText) => {
		  console.log(responseText);
		})
		.catch((error) => {
		  console.warn(error);
		});

	    
	},
	resolvePost : function(TOKEN, postNbr) {
	 
	   fetch(this.baseUrl + 'feed/' + postNbr + '/resolve' , {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    'Token' : TOKEN,
		  }
		})
		.then((response) => response.text())
		.then((responseText) => {
		  console.log(responseText);
		})
		.catch((error) => {
		  console.warn(error);
		});    
	},
	deletePost : function(TOKEN, postNbr) {
	 
	   fetch(this.baseUrl + 'feed/' + postNbr + '/delete' , {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    'Token' : TOKEN,
		  }
		})
		.then((response) => response.text())
		.then((responseText) => {
		  console.log(responseText);
		})
		.catch((error) => {
		  console.warn(error);
		});    
	},
	vouchePost : function(TOKEN, postNbr) {
	 
	   fetch(this.baseUrl + 'feed/' + postNbr + '/vouche' , {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    'Token' : TOKEN,
		  }
		})
		.then((response) => response.text())
		.then((responseText) => {
		  console.log(responseText);
		})
		.catch((error) => {
		  console.warn(error);
		});    
	},
	getLeaderboardFriends : function(TOKEN) {
	 
	   fetch(this.baseUrl + 'feed/leaderboard' , {
		  method: 'GET',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    'Token' : TOKEN,
		  }
		})
		.then((response) => response.text())
		.then((responseText) => {
		  console.log(responseText);
		})
		.catch((error) => {
		  console.warn(error);
		});    
	},

	getLocalFeed : function(TOKEN, offset, limit, lat, long) {
	 
	   fetch(this.baseUrl + 'feed/local' , {
		  method: 'GET',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    'Token' : TOKEN,
		  },
		  body: JSON.stringify({
	    	offset: offset,
	    	limit: limit,
	    	lat: lat,
	    	long: long,
	 	  })
		})
		.then((response) => response.text())
		.then((responseText) => {
		  console.log(responseText);
		})
		.catch((error) => {
		  console.warn(error);
		});    
	},
	getFriendFeed : function(TOKEN, offset, limit) {
	 
	   fetch(this.baseUrl + 'feed' , {
		  method: 'GET',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    'Token' : TOKEN,
		  },
		  body: JSON.stringify({
	    	offset: offset,
	    	limit: limit,
	  	  })
		})
		.then((response) => response.text())
		.then((responseText) => {
		  console.log(responseText);
		})
		.catch((error) => {
		  console.warn(error);
		});    
	},
	addPost : function(TOKEN, post) {
	 
	   fetch(this.baseUrl + 'feed' , {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    'Token' : TOKEN,
		  },body: JSON.stringify(post)
		  //Post klassen måste se ut som:  POST(titel, description, lat[Optional], long[Optional])
		})
		.then((response) => response.text())
		.then((responseText) => {
		  console.log(responseText);
		})
		.catch((error) => {
		  console.warn(error);
		});    
	}
}

