import hashlib, json, time

class Blockchain:
    def __init__(self):
        self.chain = []

    def add_block(self, data):
        block = {
            "index": len(self.chain),
            "timestamp": time.time(),
            "data": data,
            "previous_hash": self.chain[-1]["hash"] if self.chain else "0"
        }
        block["hash"] = self.hash(block)
        self.chain.append(block)
        return block

    def hash(self, block):
        encoded = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(encoded).hexdigest()

ledger = Blockchain()
