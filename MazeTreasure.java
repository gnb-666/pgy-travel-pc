import java.util.*;

public class MazeTreasure {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int w = scanner.nextInt();  // 方格总数
        int n = scanner.nextInt();  // 画笔数量
        
        int[] a = new int[n];      // 每支画笔可以涂的方格数
        for (int i = 0; i < n; i++) {
            a[i] = scanner.nextInt();
        }
        
        // 计算前缀和，用于快速计算区间和
        long[] prefixSum = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + a[i];
        }
        
        // 存储一定会被涂色的方格
        List<Integer> fixedPositions = new ArrayList<>();
        
        // 对于每个位置，判断是否一定会被涂色
        for (int pos = 1; pos <= w; pos++) {
            boolean mustBeColored = true;
            
            // 检查这个位置是否可能不被涂色
            for (int i = 0; i < n; i++) {
                // 计算第i支画笔可能的最左位置
                long leftBound = prefixSum[i] + i;  // 前面的画笔占用的位置 + 间隔
                // 计算第i支画笔可能的最右位置
                long rightBound = w - (prefixSum[n] - prefixSum[i + 1]) - (n - i - 1);  // 总长度 - 后面画笔占用的位置 - 间隔
                
                // 如果这个位置在第i支画笔的可能范围内
                if (pos >= leftBound + 1 && pos <= leftBound + a[i]) {
                    // 检查是否有可能不涂这个位置
                    boolean canSkip = false;
                    
                    // 尝试将第i支画笔放在其他位置
                    for (int j = 0; j < n; j++) {
                        if (j == i) continue;
                        
                        // 计算第j支画笔可能的最左位置
                        long jLeftBound = prefixSum[j] + j;
                        // 计算第j支画笔可能的最右位置
                        long jRightBound = w - (prefixSum[n] - prefixSum[j + 1]) - (n - j - 1);
                        
                        // 如果第j支画笔可以覆盖这个位置
                        if (pos >= jLeftBound + 1 && pos <= jLeftBound + a[j]) {
                            canSkip = true;
                            break;
                        }
                    }
                    
                    if (!canSkip) {
                        mustBeColored = true;
                        break;
                    }
                }
            }
            
            if (mustBeColored) {
                fixedPositions.add(pos);
            }
        }
        
        // 输出结果
        System.out.println(fixedPositions.size());
        for (int pos : fixedPositions) {
            System.out.print(pos + " ");
        }
        System.out.println();
        
        scanner.close();
    }
} 