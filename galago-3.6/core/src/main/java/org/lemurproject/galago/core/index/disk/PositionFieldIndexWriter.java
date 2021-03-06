// BSD License (http://lemurproject.org/galago-license)
package org.lemurproject.galago.core.index.disk;

import java.io.IOException;
import org.lemurproject.galago.core.types.FieldNumberWordPosition;
import org.lemurproject.galago.core.types.NumberWordPosition;
import org.lemurproject.galago.tupleflow.InputClass;
import org.lemurproject.galago.tupleflow.Processor;
import org.lemurproject.galago.tupleflow.TupleFlowParameters;
import org.lemurproject.galago.tupleflow.execution.ErrorStore;
import org.lemurproject.galago.tupleflow.execution.Verification;

/**
 *
 * @author jykim
 */
@InputClass(className = "org.lemurproject.galago.core.types.FieldNumberWordPosition", order = {"+field", "+word", "+document", "+position"})
public class PositionFieldIndexWriter implements Processor<FieldNumberWordPosition> {

  private NumberWordPosition.WordDocumentPositionOrder.TupleShredder shredder;
  private PositionIndexWriter writer;
  private String filePrefix;
  private String prevField;
  private final TupleFlowParameters p;

  public PositionFieldIndexWriter(TupleFlowParameters p) throws IOException {
    filePrefix = p.getJSON().getString("filename");
    this.p = p;
  }

  private void checkWriter(String fieldName) throws IOException {
    if (prevField == null || prevField != fieldName) {
      if (shredder != null) {
        shredder.close();
      }
      p.getJSON().set("filename", filePrefix + fieldName);
      writer = new PositionIndexWriter(p);
      shredder = new NumberWordPosition.WordDocumentPositionOrder.TupleShredder(writer);
      prevField = fieldName;
    }
  }

  public void process(FieldNumberWordPosition object) throws IOException {
    checkWriter(object.field);
    shredder.process(new NumberWordPosition(object.document, object.word, object.position));
  }

  public void close() throws IOException {

    if (shredder != null) {
      shredder.close();
    }
  }

  public static void verify(TupleFlowParameters parameters, ErrorStore store) {
    if (!parameters.getJSON().isString("filename")) {
      store.addError("PositionFieldIndexWriter requires a 'filename' parameter.");
      return;
    }

    String index = parameters.getJSON().getString("filename");
    Verification.requireWriteableFile(index, store);
  }
}
