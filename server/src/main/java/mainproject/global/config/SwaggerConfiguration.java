package mainproject.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .useDefaultResponseMessages(false)  // 기본 상태 코드에 대한 디폴트 메세지 비활성화
                .select() // ApiSelectorBuilder를 생성하여 apis()와 paths()를 사용할 수 있게 해준다.
                .apis(RequestHandlerSelectors.basePackage("mainproject.domain"))    // api 스펙이 작성되어 있는 패키지(Controller가 존재하는 패키지)를 지정하여 API를 문서화한다.
                .paths(PathSelectors.any())   // apis()로 선택되어진 API중 특정 path 조건에 맞는 API들을 다시 필터링하여 문서화한다.
                .build().apiInfo(apiInfo()) // 제목, 설명 등 문서에 대한 정보들을 설정하기 위해 호출한다.
                .securityContexts(List.of(securityContext()))
                .securitySchemes(List.of(apiKey()));
    }

    private ApiInfo apiInfo() {
        return new ApiInfo(
                "Shall we? Challenge!",
                "목표, 혼자서 끝까지 할 자신 있어? 우리가 도와줄게! Shall we ? Challenge !",
                "version 1.0",
                "http://bucket-deploy-challenge.s3-website.ap-northeast-2.amazonaws.com",
                new Contact("Github Repository", "https://github.com/codestates-seb/seb41_main_013", ""),
                "Edit Licenses",
                "https://github.com/codestates-seb/seb41_main_013",
                new ArrayList<>()
        );
    }

    private ApiKey apiKey() {
        return new ApiKey("JWT", "Authorization", "header");
    }

    private SecurityContext securityContext() {
        return SecurityContext
                .builder()
                .securityReferences(defaultAuth())
                .forPaths(PathSelectors.any())
                .build();
    }

    private List<SecurityReference> defaultAuth() {
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = new AuthorizationScope("global", "accessEverything");
        return List.of(new SecurityReference("JWT", authorizationScopes));
    }
}
