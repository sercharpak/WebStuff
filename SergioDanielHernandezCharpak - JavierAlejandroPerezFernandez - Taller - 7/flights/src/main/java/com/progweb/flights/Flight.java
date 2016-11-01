package com.progweb.flights;

import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Flight{
    
    private static final long serialVersionUID = 1L;
    private long key;
    private String name;
    private Date hour;
    private String state;
    private String ae;
    
    public Flight(){
    	
    }
    
    public Flight(long key, String ae, String name, Date hour, String state){
    	this.key = key;
    	this.ae = ae;
    	this.name = name;
    	this.hour = hour;
    	this.state = state;
    	
    }

	public long getKey() {
		return key;
	}

	public void setKey(long key) {
		this.key = key;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getHour() {
		return hour;
	}

	public void setHour(Date hour) {
		this.hour = hour;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getAe() {
		return ae;
	}

	public void setAe(String ae) {
		this.ae = ae;
	}
    
    
}
