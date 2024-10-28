export default function getMinMax(priceRange : string) {
    const [minStr, maxStr] = priceRange.split('-').map(str => str.trim());
  
    const min = parseFloat(minStr);
    const max = parseFloat(maxStr);
  
    return { min, max };
  }