package org.lemurproject.galago.core.corpus;

import org.junit.Test;
import org.lemurproject.galago.core.parse.Document;
import org.lemurproject.galago.tupleflow.*;

import java.io.*;

import static org.junit.Assert.*;

public class WebDocumentSerializerTest {

  @Test
  public void testSerializeDocument() throws IOException {
    WebDocumentSerializer wds = new WebDocumentSerializer(new Parameters());

    Document doc = new Document();
    doc.metadata.put("meta-key", "value");
    doc.metadata.put("null-meta-key", null);
    doc.name = "doc-name";
    doc.text = "doc text goes here\nand <tag>continues. This is weird</tag>";
    wds.tokenizer.tokenize(doc);

    byte[] docBytes = wds.toBytes(doc);
    assertNotNull(docBytes);

    Document doc2 = wds.fromBytes(docBytes, new Document.DocumentComponents(true, true, true));
    assertEquals(doc.name, doc2.name);
    assertEquals(doc.text, doc2.text);
    assertNotNull(doc2.metadata);
    assertEquals(doc.metadata.get("meta-key"), doc2.metadata.get("meta-key"));
    assertTrue(doc.metadata.containsKey("null-meta-key"));
    assertNull(doc.metadata.get("null-meta-key"));
    assertEquals(doc.terms, doc2.terms);
    assertEquals(doc.tags, doc2.tags);
  }

  @Test
  public void testReadFullyVsRead() throws IOException {
    final byte[] fakeData = {1, 2, 3, 4, 5, 6, -1};
    File tmp = null;
    try {
      tmp = FileUtility.createTemporary();
      // save to file
      ByteArrayInputStream bais = new ByteArrayInputStream(fakeData);
      Utility.copyStreamToFile(bais, tmp);

      RandomAccessFile raf = StreamCreator.readFile(tmp.getCanonicalPath());
      BufferedFileDataStream bfds = new BufferedFileDataStream(raf, 0, raf.length());

      ByteArrayOutputStream baos = new ByteArrayOutputStream();
      while(true) {
        int x = bfds.read();
        if(x == -1) break;
        baos.write(x);
      }

      byte[] data =  baos.toByteArray();
      assertArrayEquals(fakeData, data);

      byte[] data2 = new byte[fakeData.length];
      bfds = new BufferedFileDataStream(raf, 0, raf.length());
      int amt = bfds.read(data2, 0, (int) raf.length());
      assertEquals(fakeData.length, amt);
      assertArrayEquals(fakeData, data2);

      bfds = new BufferedFileDataStream(raf, 1, 5);
      byte[] data3 = new byte[4];
      amt = bfds.read(data3, 0, 4);
      assertEquals(4, amt);
      assertArrayEquals(new byte[]{2,3,4,5}, data3);

    } finally {
      if(tmp != null) assertTrue(tmp.delete());
    }
  }

  @Test
  public void testDefaultSerializer() throws IOException {
    DocumentSerializer ds = DocumentSerializer.instance(new Parameters());
    assertTrue(ds instanceof WebDocumentSerializer);
  }

}