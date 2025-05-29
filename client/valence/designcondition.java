import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/wastewater")
public class WastewaterController {
    
    private WastewaterCalculator calculator = new WastewaterCalculator();
    
    @PostMapping("/calculate")
    public Map<String, Double> calculate(@RequestBody Map<String, Double> inputParameters) {
        // Set all received parameters
        inputParameters.forEach((key, value) -> calculator.setParameter(key, value));
        
        // Perform calculations
        calculator.calculate();
        
        // Return all calculated parameters
        return calculator.getAllParameters();
    }
    
    @PostMapping("/reset")
    public void reset() {
        calculator.reset();
    }
    
    @PostMapping("/example")
    public Map<String, Double> fillExample() {
        calculator.fillExample();
        return calculator.getAllParameters();
    }
    
    @GetMapping("/parameters")
    public Map<String, Double> getAllParameters() {
        return calculator.getAllParameters();
    }
}