// --- Helper function to convert flat array to nested tree ---
function convertToTree  (data) {
  const map = {};
  const tree = [];
 
  // 1. Create a map of items using their ID and initialize children array
  data.forEach(item => {
    map[item.id] = { ...item, children: [] };
  });

  // 2. Iterate through the map to build the hierarchy
  Object.values(map).forEach(item => {
    // Determine if the item is a root item or a child
    if (item.procedureParentId !== null && map[item.procedureParentId]) {
      // It's a child: push it into its parent's children array
      map[item.procedureParentId].children.push(item);
    } else {
      // It's a root item
      tree.push(item);
    }
  });

  return tree;
};
export { convertToTree };        