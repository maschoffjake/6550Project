/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.lemurproject.galago.tupleflow;

import org.junit.Test;

import java.io.*;

import static org.junit.Assert.assertEquals;

/**
 *
 * @author trevor
 */
public class VByteInputTest {
  @Test
  public void testReadString() throws IOException {
    ByteArrayOutputStream stream = new ByteArrayOutputStream();
    VByteOutput output = new VByteOutput(new DataOutputStream(stream));
    output.writeString("\u2297");
    stream.close();

    ByteArrayInputStream inputStream = new ByteArrayInputStream(stream.toByteArray());
    VByteInput input = new VByteInput(new DataInputStream(inputStream));
    String result = input.readString();

    assertEquals("\u2297", result);
  }

  @Test
  public void testReadZero() throws Exception {
    ByteArrayOutputStream stream = new ByteArrayOutputStream();
    VByteOutput output = new VByteOutput(new DataOutputStream(stream));
    output.writeInt(0);
    stream.close();

    ByteArrayInputStream inputStream = new ByteArrayInputStream(stream.toByteArray());
    VByteInput input = new VByteInput(new DataInputStream(inputStream));
    int zero = input.readInt();

    assertEquals(0, zero);
  }
}
