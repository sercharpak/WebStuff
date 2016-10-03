package com.ldodds.amazon;

import com.hp.hpl.jena.rdf.model.*;

/**
 * Vocabulary definitions for the Amazon properties returned by MB. This class is 
 * a hand-crafted equivalent of vocabulary definitions generated 
 * automatically by using the Jena <code>schemagen</code> tool. 
 * 
 * @author ldodds
 */
public class Amazon
{
   /** <p>The RDF model that holds the vocabulary terms</p> */
   private static Model m_model = ModelFactory.createDefaultModel();

   /** <p>The namespace of the vocabalary as a string ({@value})</p> */
   public static final String NS = "http://www.amazon.com/gp/aws/landing.html#";

   /** <p>The namespace of the vocabalary as a string</p>
    *  @see #NS */
   public static String getURI() {return NS;}
   
   /** <p>The namespace of the vocabalary as a resource</p> */
   public static final Resource NAMESPACE = m_model.createResource( NS );
   
   public static final Property Asin = m_model.createProperty(NS + "Asin");   
}
