// lib/mathUtils.js
export const evaluateExpression = (expression) => {
    try {
      // 0での除算をチェック
      if (/\/\s*0(?![0-9])/.test(expression)) {
        return null;
      }
      
      // 先頭の0をチェック（例：01は不正）
      if (/(?<![0-9])0[0-9]/.test(expression)) {
        return null;
      }
  
      // 式を評価
      const result = Function('"use strict";return (' + 
        expression.replace(/×/g, '*').replace(/÷/g, '/') + 
      ')')();
      
      if (!Number.isFinite(result)) {
        return null;
      }
      
      return result;
    } catch {
      return null;
    }
  };
  
  // 式から数字を抽出する
  export const extractNumbersFromExpression = (expression) => {
    return expression.match(/\d/g)?.map(Number) || [];
  };
  
  // 2つの配列が同じ数字を含むかチェック
  export const areArraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    const sorted1 = [...arr1].sort();
    const sorted2 = [...arr2].sort();
    return sorted1.every((value, index) => value === sorted2[index]);
  };