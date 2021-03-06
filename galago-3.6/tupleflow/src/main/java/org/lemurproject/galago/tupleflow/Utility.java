// BSD License (http://lemurproject.org/galago-license)
package org.lemurproject.galago.tupleflow;

import org.lemurproject.galago.tupleflow.execution.Step;

import java.io.*;
import java.net.ServerSocket;
import java.util.*;

/**
 * Lots of static methods here that have broad use.
 *
 * @author trevor
 */
public class Utility {
  // Some constant values
  public static final double log2 = Math.log(2);
  public static final double loge_base2 = Math.log(Math.E) / log2;
  public static final double tinyLogProbScore = Math.log(Math.pow(10, -10));
  public static final double epsilon = 0.5 * Math.pow(10, -10);
  public static final double neg_epsilon = -1.0 * epsilon;

  /**
   * Builds a simple Sorter step that can be added to a TupleFlow stage.
   *
   * @param sortOrder An order object representing how and what to sort.
   * @return a Step object that can be added to a TupleFlow Stage.
   */
  public static Step getSorter(Order sortOrder) {
    return getSorter(sortOrder, null, CompressionType.VBYTE);
  }

  public static Step getSorter(Order sortOrder, CompressionType c) {
    return getSorter(sortOrder, null, c);
  }

  public static Step getSorter(Order sortOrder, Class<?> reducerClass, CompressionType c) {
    Parameters p = new Parameters();
    p.set("class", sortOrder.getOrderedClass().getName());
    p.set("order", Utility.join(sortOrder.getOrderSpec()));
    if (c != null) {
      p.set("compression", c.toString());
//      System.err.println("Setting sorter to :" + c.toString() + " -- " + join(sortOrder.getOrderSpec()));
//    } else {
//      System.err.println("NOT setting sorter to : null -- " + join(sortOrder.getOrderSpec()));
    }

    if (reducerClass != null) {
      try {
        reducerClass.asSubclass(Reducer.class);
      } catch (ClassCastException e) {
        throw new IllegalArgumentException("getSorter called with a reducerClass argument "
                + "which is not actually a reducer: "
                + reducerClass.getName());
      }
      p.set("reducer", reducerClass.getName());
    }
    return new Step(Sorter.class, p);
  }

  /**
   * Finds a free port to listen on. Useful for starting up internal web
   * servers. (copied from chaoticjava.com)
   */
  public static int getFreePort() throws IOException {
    ServerSocket server = new ServerSocket(0);
    int port = server.getLocalPort();
    server.close();
    return port;
  }

  public static boolean isInteger(String s) {
    try {
      Integer.parseInt(s);
      return true;
    } catch (Exception e) {
      return false;
    }
  }

  public static String escape(String raw) {
    StringBuilder builder = new StringBuilder();

    for (int i = 0; i < raw.length(); i++) {
      char c = raw.charAt(i);

      if (c == '"') {
        builder.append("&quot;");
      } else if (c == '&') {
        builder.append("&amp;");
      } else if (c == '<') {
        builder.append("&gt;");
      } else if (c == '>') {
        builder.append("&lt;");
      } else if (c <= 127) {
        builder.append(c);
      } else {
        int unsigned = ((int) c) & 0xFFFF;

        builder.append("&#");
        builder.append(unsigned);
        builder.append(";");
      }
    }

    return builder.toString();
  }

  public static String strip(String source, String suffix) {
    if (source.endsWith(suffix)) {
      return source.substring(0, source.length() - suffix.length());
    }

    return null;
  }

  /**
   * <p>Splits args into an array of flags and an array of parameters.</p>
   *
   * <p>This method assumes that args is an array of strings, where some of
   * those strings are flags (they start with '-') and the others are non-flag
   * arguments. This splits those into two arrays so they can be processed
   * separately.</p>
   *
   * @return An array of length 2, where the first element is an array of flags
   * and the second is an array of arguments.
   */
  public static String[][] filterFlags(String[] args) {
    ArrayList<String> flags = new ArrayList<String>();
    ArrayList<String> nonFlags = new ArrayList<String>();

    for (String arg : args) {
      if (arg.startsWith("-")) {
        flags.add(arg);
      } else {
        nonFlags.add(arg);
      }
    }

    String[][] twoArrays = new String[2][];
    twoArrays[0] = flags.toArray(new String[flags.size()]);
    twoArrays[1] = nonFlags.toArray(new String[nonFlags.size()]);

    return twoArrays;
  }

  /**
   * For an array master, returns an array containing the last
   * master.length-index elements.
   */
  public static String[] subarray(String[] master, int index) {
    if (master.length <= index) {
      return new String[0];
    } else {
      String[] sub = new String[master.length - index];
      System.arraycopy(master, index, sub, 0, sub.length);
      return sub;
    }
  }

  /**
   * Returns a string containing all the elements of args, space delimited.
   */
  public static String join(String[] args, String delimiter) {
		return join(Arrays.asList(args), delimiter);
  }

  public static String join(List<String> args, String delimiter) {
    StringBuilder builder = new StringBuilder();

    for (String arg : args) {
      if (builder.length() > 0) {
        builder.append(delimiter);
      }
      builder.append(arg);
    }

    return builder.toString();
  }

  public static String join(String[] args) {
    return join(args, " ");
  }

  public static String join(Object[] args, String delimiter) {
    StringBuilder builder = new StringBuilder();

    for (Object arg : args) {
      if (builder.length() > 0) {
        builder.append(delimiter);
      }
      builder.append(arg.toString());
    }

    return builder.toString();
  }

  public static String join(double[] numbers) {
    return join(numbers, ",");
  }

  public static String join(double[] numbers, String delimiter) {
    StringBuilder builder = new StringBuilder();

    for (double arg : numbers) {
      if (builder.length() > 0) {
        builder.append(delimiter);
      }
      builder.append(arg);
    }

    return builder.toString();
  }

  public static String join(int[] numbers) {
    return join(numbers, ",");
  }

  public static String join(int[] numbers, String delimiter) {
    StringBuilder builder = new StringBuilder();

    for (int arg : numbers) {
      if (builder.length() > 0) {
        builder.append(delimiter);
      }
      builder.append(arg);
    }

    return builder.toString();
  }

  public static String join(short[] numbers) {
    return join(numbers, ",");
  }

  public static String join(short[] numbers, String delimiter) {
    StringBuilder builder = new StringBuilder();

    for (short arg : numbers) {
      if (builder.length() > 0) {
        builder.append(delimiter);
      }
      builder.append(arg);
    }

    return builder.toString();
  }

  public static int compare(int one, int two) {
    return one - two;
  }

  public static int compare(long one, long two) {
    long result = one - two;

    if (result > 0) {
      return 1;
    }
    if (result < 0) {
      return -1;
    }
    return 0;
  }

  public static int compare(double one, double two) {
    double result = one - two;

    if (result > epsilon) {
      return 1;
    }
    if (result < neg_epsilon) {
      return -1;
    }
    return 0;
  }

  public static int compare(float one, float two) {
    float result = one - two;

    if (result > epsilon) {
      return 1;
    }
    if (result < neg_epsilon) {
      return -1;
    }
    return 0;
  }

  public static int compare(String one, String two) {
    return one.compareTo(two);
  }

  public static int compare(byte[] one, byte[] two) {
    int sharedLength = Math.min(one.length, two.length);

    for (int i = 0; i < sharedLength; i++) {
      int a = ((int) one[i]) & 0xFF;
      int b = ((int) two[i]) & 0xFF;
      int result = a - b;

      if (result < 0) {
        return -1;
      }
      if (result > 0) {
        return 1;
      }
    }

    return one.length - two.length;
  }

  // comparator for byte arrays
  public static class ByteArrComparator implements Comparator<byte[]>, Serializable {

    @Override
    public int compare(byte[] a, byte[] b) {
      return Utility.compare(a, b);
    }
  }

  public static int hash(byte b) {
    return ((int) b) & 0xFF;
  }

  public static int hash(int i) {
    return i;
  }

  public static int hash(long l) {
    return (int) l;
  }

  public static int hash(double d) {
    return (int) (d * 100000);
  }

  public static int hash(float f) {
    return (int) (f * 100000);
  }

  public static int hash(String s) {
    return s.hashCode();
  }

  public static int hash(byte[] bytes) {
    int h = 0;
    for (byte b : bytes) {
      h += 7 * h + b;
    }
    return h;
  }

  public static void deleteDirectory(File directory) throws IOException {
    if (directory.isDirectory()) {
      File[] files = directory.listFiles();
      if(files != null) {
        for (File sub : files) {
          if (sub.isDirectory()) {
            deleteDirectory(sub);
          } else {
            sub.delete();
          }
        }
      }
    }
    directory.delete();
  }

  /**
   * Copies data from the input stream to the output stream.
   *
   * @param input The input stream.
   * @param output The output stream.
   * @throws java.io.IOException
   */
  public static void copyStream(InputStream input, OutputStream output) throws IOException {
    byte[] data = new byte[65536];
    while (true) {
      int bytesRead = input.read(data);
      if (bytesRead < 0) {
        break;
      }
      output.write(data, 0, bytesRead);
    }
  }

  /**
   * Copies data from the input stream and returns a String (UTF-8 if not
   * specified)
   */
  public static String copyStreamToString(InputStream input, String encoding) throws IOException {
    encoding = (encoding == null) ? "UTF-8" : encoding;
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    copyStream(input, baos);
    return baos.toString(encoding);
  }

  public static String copyStreamToString(InputStream input) throws IOException {
    return copyStreamToString(input, "UTF-8");
  }

  /**
   * Copies the data from file into the stream. Note that this method does not
   * close the stream (in case you want to put more in it).
   *
   * @throws java.io.IOException
   */
  public static void copyFileToStream(File file, OutputStream stream) throws IOException {
    InputStream input = null;
    try {
      input = new FileInputStream(file);
      long longLength = file.length();
      final int fiveMegabytes = 5 * 1024 * 1024;

      while (longLength > 0) {
        int chunk = (int) Math.min(longLength, fiveMegabytes);
        byte[] data = new byte[chunk];
        int readlen = input.read(data, 0, chunk);
        stream.write(data, 0, readlen);
        longLength -= chunk;
      }
    } finally {
      if(input != null) input.close();
    }
  }

  /**
   * Copies the data from the InputStream to a file, then closes both when
   * finished.
   *
   * @throws java.io.IOException
   */
  public static void copyStreamToFile(InputStream stream, File file) throws IOException {
    DataOutputStream output = null;
    try {
      output = StreamCreator.openOutputStream(file);
      final int oneMegabyte = 1 * 1024 * 1024;
      byte[] data = new byte[oneMegabyte];

      while (true) {
        int bytesRead = stream.read(data);

        if (bytesRead < 0) {
          break;
        }
        output.write(data, 0, bytesRead);
      }
    } finally {
      stream.close();
      if(output != null) output.close();
    }
  }

  /**
   * Copies the data from the string s to the file.
   * @throws java.io.IOException
   */
  public static void copyStringToFile(String s, File file) throws IOException {
    DataOutputStream output = null;
    try {
      output = StreamCreator.openOutputStream(file);
      output.write(Utility.fromString(s));
    } finally {
      if(output != null) output.close();
    }
  }

  public static BufferedReader utf8Reader(String file) throws IOException {
    return utf8Reader(new File(file));
  }

  public static BufferedReader utf8Reader(File fp) throws IOException {
    try {
      return new BufferedReader(new InputStreamReader(StreamCreator.openInputStream(fp), "UTF-8"));
    } catch (UnsupportedEncodingException e) {
      throw new RuntimeException(e);
    }
  }

  public static HashSet<String> readStreamToStringSet(InputStream stream) throws IOException {
    BufferedReader reader = new BufferedReader(new InputStreamReader(stream, "UTF-8"));
    HashSet<String> set = new HashSet<String>();
    String line;

    while ((line = reader.readLine()) != null) {
      set.add(line.trim());
    }

    reader.close();
    return set;
  }

  public static HashSet<String> readFileToStringSet(File file) throws IOException {
    BufferedReader reader = utf8Reader(file);
    HashSet<String> set = new HashSet<String>();
    String line;

    while ((line = reader.readLine()) != null) {
      set.add(line.trim());
    }

    reader.close();
    return set;
  }

  public static String readFileToString(File file) throws IOException {
    BufferedReader reader = null;
    try {
      reader = utf8Reader(file);
      StringBuilder sb = new StringBuilder();
      String line;

      while ((line = reader.readLine()) != null) {
        sb.append(line).append("\n");
      }

      return sb.toString();
    } finally {
      if(reader != null) reader.close();
    }
  }

  /*
   * Functions to translate:
   *  - strings to bytes
   *  - bytes to strings
   *  - integers to bytes
   *  - bytes to integers
   */
  public static String toString(byte[] buffer, int offset, int len) {
    try {
      return new String(buffer, offset, len, "UTF-8");
    } catch (UnsupportedEncodingException e) {
      throw new RuntimeException("UTF-8 is not supported by your Java Virtual Machine.");
    }
  }

  public static String toString(byte[] word) {
    try {
      return new String(word, "UTF-8");
    } catch (UnsupportedEncodingException e) {
      throw new RuntimeException("UTF-8 is not supported by your Java Virtual Machine.");
    }
  }

  public static byte[] fromString(String word) {
    try {
      return word.getBytes("UTF-8");
    } catch (UnsupportedEncodingException e) {
      throw new RuntimeException("UTF-8 is not supported by your Java Virtual Machine.");
    }
  }

  public static short toShort(byte[] key) {
    assert (key.length == 2);
    int value = ((key[0] << 8) + key[1]);
    return ((short) value);
  }

  public static byte[] fromShort(short key) {
    byte[] writeBuffer = new byte[2];
    writeBuffer[0] = (byte) ((key >>> 8) & 0xFF);
    writeBuffer[1] = (byte) key;
    return writeBuffer;
  }

  public static boolean isInt(byte[] key) {
    return key != null && key.length == 4;
  }

  public static int toInt(byte[] key) {
    assert isInt(key);
    return (((key[0] & 255) << 24)
            + ((key[1] & 255) << 16)
            + ((key[2] & 255) << 8)
            + (key[3] & 255));
  }

  public static byte[] fromInt(int key) {
    byte[] converted = new byte[4];
    converted[0] = (byte) ((key >>> 24) & 0xFF);
    converted[1] = (byte) ((key >>> 16) & 0xFF);
    converted[2] = (byte) ((key >>> 8) & 0xFF);
    converted[3] = (byte) (key & 0xFF);
    return converted;
  }

  public static boolean isLong(byte[] value) {
    return (value != null && value.length == 8);
  }

  public static long toLong(byte[] key) {
    assert isLong(key);
    return (((long) key[0] << 56)
            + ((long) (key[1] & 255) << 48)
            + ((long) (key[2] & 255) << 40)
            + ((long) (key[3] & 255) << 32)
            + ((long) (key[4] & 255) << 24)
            + ((key[5] & 255) << 16)
            + ((key[6] & 255) << 8)
            + ((key[7] & 255) << 0));
  }

  public static byte[] fromLong(long key) {
    byte[] writeBuffer = new byte[8];

    writeBuffer[0] = (byte) (key >>> 56);
    writeBuffer[1] = (byte) (key >>> 48);
    writeBuffer[2] = (byte) (key >>> 40);
    writeBuffer[3] = (byte) (key >>> 32);
    writeBuffer[4] = (byte) (key >>> 24);
    writeBuffer[5] = (byte) (key >>> 16);
    writeBuffer[6] = (byte) (key >>> 8);
    writeBuffer[7] = (byte) (key >>> 0);
    return writeBuffer;
  }

  /**
   * Check that we are given a byte array of length 1 to parse as a boolean.
   */
  public static boolean isBoolean(byte[] key) {
    return key != null && key.length == 1;
  }

  public static boolean toBoolean(byte[] key) {
    assert isBoolean(key);
    return (key[0] != 0);
  }

  public static byte[] fromBoolean(boolean key) {
    byte[] out = new byte[1];
    if (key) {
      out[0] = 1;
    } else {
      out[0] = 0;
    }
    return out;
  }

  /**
   * This method checks whether the byte array is of the correct size to be a
   * double.
   *
   * @param value - a byte array
   * @return true if non-null and 8 bytes long
   */
  public static boolean isDouble(byte[] value) {
    return (value != null && isLong(value));
  }

  /*
   * NOTE: doubles should NOT be used as index keys
   *  - rounding errors are likely to cause otherwise identical values not to match
   */
  public static double toDouble(byte[] value) {
    assert isDouble(value);
    long l = Utility.toLong(value);
    return Double.longBitsToDouble(l);
  }

  public static byte[] fromDouble(double value) {
    long l = Double.doubleToRawLongBits(value);
    return Utility.fromLong(l);
  }

  public static byte[] compressInt(int i) throws IOException {
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    DataOutputStream dos = new DataOutputStream(baos);
    compressInt(dos, i);
    return baos.toByteArray();
  }

  public static byte[] compressLong(long l) throws IOException {
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    DataOutputStream dos = new DataOutputStream(baos);
    compressLong(dos, l);
    return baos.toByteArray();
  }

  public static void compressInt(DataOutput output, int i) throws IOException {
    assert i >= 0;

    if (i < 1 << 7) {
      output.writeByte((i | 0x80));
    } else if (i < 1 << 14) {
      output.writeByte((i >> 0) & 0x7f);
      output.writeByte(((i >> 7) & 0x7f) | 0x80);
    } else if (i < 1 << 21) {
      output.writeByte((i >> 0) & 0x7f);
      output.writeByte((i >> 7) & 0x7f);
      output.writeByte(((i >> 14) & 0x7f) | 0x80);
    } else if (i < 1 << 28) {
      output.writeByte((i >> 0) & 0x7f);
      output.writeByte((i >> 7) & 0x7f);
      output.writeByte((i >> 14) & 0x7f);
      output.writeByte(((i >> 21) & 0x7f) | 0x80);
    } else {
      output.writeByte((i >> 0) & 0x7f);
      output.writeByte((i >> 7) & 0x7f);
      output.writeByte((i >> 14) & 0x7f);
      output.writeByte((i >> 21) & 0x7f);
      output.writeByte(((i >> 28) & 0x7f) | 0x80);
    }
  }

  public static int uncompressInt(DataInput input) throws IOException {
    int result = 0;
    int b;

    for (int position = 0; true; position++) {
      assert position < 6;
      b = input.readUnsignedByte();
      if ((b & 0x80) == 0x80) {
        result |= ((b & 0x7f) << (7 * position));
        break;
      } else {
        result |= (b << (7 * position));
      }
    }

    return result;
  }

  public static int uncompressInt(byte[] input, int offset) throws IOException {
    int result = 0;
    int b;

    for (int position = 0; true; position++) {
      assert input.length < 6;
      b = input[position + offset];
      if ((b & 0x80) == 0x80) {
        result |= ((b & 0x7f) << (7 * position));
        break;
      } else {
        result |= (b << (7 * position));
      }
    }

    return result;
  }

  public static void compressLong(DataOutput output, long i) throws IOException {
    assert i >= 0;

    if (i < 1 << 7) {
      output.writeByte((int) (i | 0x80));
    } else if (i < 1 << 14) {
      output.writeByte((int) (i >> 0) & 0x7f);
      output.writeByte((int) ((i >> 7) & 0x7f) | 0x80);
    } else if (i < 1 << 21) {
      output.writeByte((int) (i >> 0) & 0x7f);
      output.writeByte((int) (i >> 7) & 0x7f);
      output.writeByte((int) ((i >> 14) & 0x7f) | 0x80);
    } else {
      while (i >= 1 << 7) {
        output.writeByte((int) (i & 0x7f));
        i >>= 7;
      }

      output.writeByte((int) (i | 0x80));
    }
  }

  public static long uncompressLong(DataInput input) throws IOException {
    long result = 0;
    long b;

    for (int position = 0; true; position++) {
      assert position < 10;
      b = input.readUnsignedByte();

      if ((b & 0x80) == 0x80) {
        result |= ((b & 0x7f) << (7 * position));
        break;
      } else {
        result |= (b << (7 * position));
      }
    }

    return result;
  }

  public static long uncompressLong(byte[] input, int offset) throws IOException {
    long result = 0;
    long b;

    for (int position = 0; true; position++) {
      assert position < 10;
      b = input[position + offset];

      if ((b & 0x80) == 0x80) {
        result |= ((b & 0x7f) << (7 * position));
        break;
      } else {
        result |= (b << (7 * position));
      }
    }

    return result;
  }
}
