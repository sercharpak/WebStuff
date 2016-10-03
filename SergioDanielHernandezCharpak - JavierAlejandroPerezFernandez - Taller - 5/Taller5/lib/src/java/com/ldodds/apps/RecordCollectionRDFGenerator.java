package com.ldodds.apps;

import java.io.*;
import java.util.*;

import com.hp.hpl.jena.rdf.model.*;

import com.ldodds.musicbrainz.*;

/**
 * Generates an RDF export of your album collection.
 * 
 * The application expects a file containing a series of 
 * album names, one per line. It's easy to generate this format 
 * from a spreadsheet application so one can create the input file that 
 * way if necessary.
 * 
 * The application will contain the MusicBrainz server and attempt 
 * to collect the metadata about each album, generating a complete 
 * RDF export which is then dumped to standard out.
 * 
 * @author ccslrd
 */
public class RecordCollectionRDFGenerator
{
   private MusicBrainz _server;
   
   public RecordCollectionRDFGenerator()
   {
      _server = new MusicBrainzImpl();
   }
   
   public void process(File input, File output) throws IOException
   {
      process(input, new FileOutputStream(output));
   }
   
   public void process(File input, OutputStream out) throws IOException
   {
      process(new BufferedInputStream( new FileInputStream(input) ), out);
   }
   
   public void process(InputStream in, OutputStream out) throws IOException
   {
      BufferedReader reader = new BufferedReader(new InputStreamReader(in));
      String albumName = reader.readLine();
      List albums = new ArrayList();
      while (albumName != null)
      {
         Model model = _server.findAlbumByName(albumName, 4, 1);
         List returnedAlbums = BeanPopulator.getAlbums(model);
         
         if (returnedAlbums.size() > 0)
         {
            //assume first item is correct...
            albums.add(returnedAlbums.get(0));
         }
         
         albumName = reader.readLine();
      }
         
      
      Model model = ModelFactory.createDefaultModel();
      AlbumTripleBuilder tripleBuilder = new AlbumTripleBuilder(model);
      tripleBuilder.addAlbums(albums);
      model.write(out);
   }
   
   public static void main(String[] args) throws IOException
   {
      RecordCollectionRDFGenerator rdfGenerator = new RecordCollectionRDFGenerator();
      rdfGenerator.process( new File(args[0]), System.out);
   }
}
