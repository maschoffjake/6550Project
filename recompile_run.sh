cd galago-3.6
./scripts/installib.sh
mvn clean
mvn -DskipTests=true install
chmod +x core/target/appassembler/bin/galago
cd ..
galago-3.6/core/target/appassembler/bin/galago search --index="wiki-large-index"