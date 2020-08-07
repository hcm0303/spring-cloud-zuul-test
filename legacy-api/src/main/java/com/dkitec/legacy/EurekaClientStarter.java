package com.dkitec.legacy;

import com.netflix.appinfo.ApplicationInfoManager;
import com.netflix.appinfo.DataCenterInfo;
import com.netflix.appinfo.EurekaInstanceConfig;
import com.netflix.appinfo.InstanceInfo;
import com.netflix.appinfo.LeaseInfo;
import com.netflix.appinfo.MyDataCenterInfo;
import com.netflix.appinfo.MyDataCenterInstanceConfig;
import com.netflix.discovery.DefaultEurekaClientConfig;
import com.netflix.discovery.DiscoveryClient;
import com.netflix.discovery.EurekaClient;

import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

@Component
public class EurekaClientStarter {

    private String serviceUrl = "/";
    private String myRootPath = serviceUrl;
    private String serviceName = "legacy-api";
    private String hostName = "localhost";
    private String myIp = "127.0.0.1";
    private int myPort = 11001;

    private EurekaClient eurekaClient;

    @PostConstruct
    public void startEurekaClient() {
        registerService(serviceName, myRootPath);
    }

    @PreDestroy
    public void shutdownEurekaClient() {
        if(eurekaClient != null) {
            eurekaClient.shutdown();
        }
    }

    private void registerService(String serviceName, String serviceUrl) {
        EurekaInstanceConfig instanceConfig = new MyDataCenterInstanceConfig(serviceName);
        InstanceInfo instanceInfo = buildInstanceInfo(serviceName, serviceUrl);
        ApplicationInfoManager applicationInfoManager = new ApplicationInfoManager(instanceConfig, instanceInfo);
        eurekaClient = new DiscoveryClient(applicationInfoManager, new DefaultEurekaClientConfig());
        eurekaClient.registerHealthCheck(instanceStatus -> {
            /* write code to check health of service and make change status of service in eureka */
            return InstanceInfo.InstanceStatus.UP;
        });
    }

    private InstanceInfo buildInstanceInfo(String serviceName, String serviceUrl) {
        return InstanceInfo.Builder.newBuilder()
                .setAppName(serviceName) /*SERVICE-NAME*/
                .setIPAddr(myIp) /*SERVICE HOST IP*/
                //.setAppGroupName(serviceAppGroup)
                .setDataCenterInfo(new MyDataCenterInfo(DataCenterInfo.Name.MyOwn))
                .setHostName(hostName) /*SERVICE HOST NAME*/
                .setInstanceId(hostName + ":" + serviceName + ":" + myPort)
                .setPort(myPort) /*SERVICE HOST SERVER PORT*/
                .setVIPAddress(serviceName)
                .setHealthCheckUrls("/healthCheck", null, null) /*SERVICE HEALTH CHECK URL*/
                .setHomePageUrl(serviceUrl, null)
                .setStatusPageUrl("/status", null)
                .setLeaseInfo(LeaseInfo.Builder.newBuilder().setDurationInSecs(10).build())
                .build();
    }

}
