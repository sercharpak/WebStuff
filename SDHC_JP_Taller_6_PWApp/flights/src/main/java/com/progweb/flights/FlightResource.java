package com.progweb.flights;


import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/flights")
public class FlightResource {
	
	FlightService flighservice = new FlightService();
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Flight> getText(){
		return flighservice.getAllFlights();
	}	
	
    @GET
    @Path("/{flightkey}")
    @Produces(MediaType.APPLICATION_JSON)
    public Flight getFlight(@PathParam("flightkey") int flightkey) {
        return flighservice.getFlight(flightkey);
    }
    
}
