import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";

const config = {
  dictionaries: [adjectives, animals],
  style: "capital",
  separator: "",
};

const uuidToDescriptorMap = {};

// Function to convert UUID to a human-readable descriptor
export function getReadableDescriptor(uuid) {
  // If UUID is already in the map, return its descriptor
  if (uuidToDescriptorMap[uuid]) {
    return uuidToDescriptorMap[uuid];
  }

  // Otherwise, generate a new descriptor and store it in the map
  const newDescriptor = uniqueNamesGenerator({ ...config, seed: uuid });
  uuidToDescriptorMap[uuid] = newDescriptor;
  return newDescriptor;
}
