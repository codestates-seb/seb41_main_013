package mainproject.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .useDefaultResponseMessages(false)
                .select() // ApiSelectorBuilder를 생성하여 apis()와 paths()를 사용할 수 있게 해준다.
                .apis(RequestHandlerSelectors.any())  // api 스펙이 작성되어 있는 패키지(Controller가 존재하는 패키지)를 지정하여 API를 문서화한다.
                .paths(PathSelectors.any())   // apis()로 선택되어진 API중 특정 path 조건에 맞는 API들을 다시 필터링하여 문서화한다.
                .build().apiInfo(apiInfo());    // 제목, 설명 등 문서에 대한 정보들을 설정하기 위해 호출한다.
    }

    private ApiInfo apiInfo() {
        return new ApiInfo(
                "Title",
                "Description",
                "version 1.0",
                "https://github.com/codestates-seb/seb41_main_013",
                new Contact("Contact Me", "https://github.com/codestates-seb/seb41_main_013", ""),
                "Edit Licenses",
                "https://github.com/codestates-seb/seb41_main_013",
                new ArrayList<>()
        );
    }
}
